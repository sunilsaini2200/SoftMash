using Application.Common.Interfaces;

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;

namespace Infrastructure.Files
{
    public class ExcelConverter : IExcelConverter
    {
        public DataSet Convert(Stream stream)
        {
            DataSet ds = new DataSet();
            using SpreadsheetDocument document = SpreadsheetDocument.Open(stream, false);
            foreach (Sheet sheet in document.WorkbookPart.Workbook.Sheets)
            {
                DataTable dt = new DataTable(sheet.Name);
                WorksheetPart wsp = (WorksheetPart)document.WorkbookPart.GetPartById(sheet.Id.Value);
                foreach (var sheetData in wsp.Worksheet.Elements<SheetData>())
                {
                    var rowCollection = sheetData.Descendants<Row>();
                    int i = 0;

                    foreach (var row in rowCollection)
                    {
                        if (i++ == 0)
                        {
                            foreach (Cell cell in row)
                            {
                                string colName = GetValue(document, cell);
                                string origColName = colName;
                                int col = 0;

                                while (dt.Columns.Contains(colName))
                                {
                                    col++;
                                    colName = origColName + col;
                                }

                                dt.Columns.Add(colName);
                            }
                        }
                        else
                        {
                            DataRow dr = dt.NewRow();
                            foreach (Cell cell in row)
                            {
                                string value = GetValue(document, cell);
                                int index = ColumnIndex(cell.CellReference.InnerText) - 1;
                                if (index < dt.Columns.Count)
                                    dr.SetField(index, value);
                            }
                            dt.Rows.Add(dr);
                        }
                    }
                }
                ds.Tables.Add(dt);
            }
            return ds;
        }

        public byte[] Convert(IEnumerable<dynamic> data, string sheetName = "Sheet 1", Dictionary<string, string> columns = null)
        {
            Type baseType = data.GetType().GetGenericArguments()[0];
            var props = baseType.GetProperties();

            using MemoryStream ms = new MemoryStream();
            using SpreadsheetDocument document = SpreadsheetDocument.Create(ms, SpreadsheetDocumentType.Workbook);
            var wbp = document.AddWorkbookPart();
            var wb = new Workbook();
            var sheets = new Sheets();
            var wsp = wbp.AddNewPart<WorksheetPart>();
            var sheetData = new SheetData();
            var ws = new Worksheet(sheetData);
            var sheet = new Sheet
            {
                Id = document.WorkbookPart.GetIdOfPart(wsp),
                SheetId = new UInt32Value(1u),
                Name = sheetName
            };
            wsp.Worksheet = ws;
            wbp.Workbook = wb;
            wb.Sheets = sheets;
            sheets.Append(sheet);

            List<string> sharedStringTable = new List<string>();
            UInt32Value sharedStringCount = 0;
            UInt32Value rowIndex = 1u;
            var row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = $"1:{props.Length}" } };
            var colIndex = 1;
            foreach (var prop in props)
            {
                var value = prop.Name;
                if (columns?[prop.Name] != null)
                    value = columns[prop.Name];

                if (!sharedStringTable.Contains(value))
                {
                    sharedStringTable.Add(value);
                }
                value = sharedStringTable.IndexOf(value).ToString();
                sharedStringCount++;

                row.AppendChild(new Cell
                {
                    DataType = CellValues.SharedString,
                    CellValue = new CellValue(value),
                    CellReference = new StringValue { InnerText = $"{ToLetters(colIndex++)}{rowIndex - 1}" }
                });
            }
            sheetData.AppendChild(row);

            foreach (var d in data)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = $"1:{props.Length}" } };
                colIndex = 1;
                foreach (var prop in props)
                {
                    var value = System.Convert.ToString(prop.GetValue(d));
                    var cell = new Cell()
                    {
                        CellReference = new StringValue { InnerText = $"{ToLetters(colIndex++)}{rowIndex - 1}" }
                    };
                    if (decimal.TryParse(value, out decimal dec))
                    {
                        cell.DataType = CellValues.Number;
                        cell.CellValue = new CellValue(value);
                    }
                    //else if (DateTime.TryParse(value, out DateTime dt))
                    //{
                    //    cell.DataType = CellValues.Date;
                    //    cell.CellValue = new CellValue(dt.ToShortDateString());
                    //}
                    else if (bool.TryParse(value, out bool b))
                    {
                        cell.DataType = CellValues.Boolean;
                        cell.CellValue = new CellValue(b ? "1" : "0");
                    }
                    else
                    {
                        if (DateTime.TryParse(value, out DateTime dt))
                        {
                            //cell.DataType = CellValues.Date;
                            value = dt.ToShortDateString();
                        }


                        if (!sharedStringTable.Contains(value))
                        {
                            sharedStringTable.Add(value);
                        }
                        value = sharedStringTable.IndexOf(value).ToString();

                        cell.DataType = CellValues.SharedString;
                        cell.CellValue = new CellValue(value);
                    }
                    row.AppendChild(cell);
                }
                sheetData.AppendChild(row);
            }

            var sstp = wbp.AddNewPart<SharedStringTablePart>();
            var sst = new SharedStringTable() { Count = UInt32Value.FromUInt32((uint)sharedStringCount), UniqueCount = UInt32Value.FromUInt32((uint)sharedStringTable.Count) };
            foreach (var ss in sharedStringTable)
            {
                sst.Append(new SharedStringItem(new Text(ss)));
            }
            sstp.SharedStringTable = sst;

            document.Close();
            return ms.ToArray();
        }

        string ToLetters(int i)
        {
            List<int> remainders = new List<int>();
            while (i != 0)
            {
                remainders.Add(i % 26);
                i /= 26;
            }
            remainders.Reverse();
            return (string.Join(string.Empty, remainders.Select(r => (char)(r + 64))));
        }

        private int ColumnIndex(string reference)
        {
            int ci = 0;
            reference = reference.ToUpper();
            for (int ix = 0; ix < reference.Length && reference[ix] >= 'A'; ix++)
                ci = (ci * 26) + ((int)reference[ix] - 64);
            return ci;
        }
        private string GetValue(SpreadsheetDocument document, Cell cell)
        {
            SharedStringTablePart sharedStringTable = document.WorkbookPart.SharedStringTablePart;
            if (cell.CellValue == null)
            {
                return string.Empty;
            }

            string cellValue = cell.CellValue.InnerText;
            if (cell.DataType?.Value == CellValues.SharedString)
            {
                return sharedStringTable.SharedStringTable.ChildElements[int.Parse(cellValue)].InnerText;
            }
            else
            {
                return cellValue;
            }
        }
    }
}
