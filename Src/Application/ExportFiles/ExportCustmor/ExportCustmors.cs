using Application.Common.Interfaces;
using Application.Models;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExportFiles.ExportCustmor
{
    public class ExportCustmors : GridQuery, IRequest<ExportFeature>
    {
    }
    public class ExportCustmorsHandler : IRequestHandler<ExportCustmors, ExportFeature>
    {
        private readonly IApplicationDbContext _context;
        
        private readonly IExcelConverter _excelConverter;
        private readonly IMapper _mapper;
        public ExportCustmorsHandler(IApplicationDbContext context, IExcelConverter excelConverter, IMapper mapper)
        {
            _context = context;
            
            _excelConverter = excelConverter;
            _mapper = mapper;
        }

        public async Task<ExportFeature> Handle(ExportCustmors request, CancellationToken cancellationToken)
        {
            try
            {
                var VelData = await _context.Set<Domain.Entities.Customer>()
                    .Select(x => new ExportCustomerDto
                    {
                        CustomerId = x.CustomerId,
                        CompanyName = x.CompanyName,
                        ContactTitle = x.ContactTitle,
                        Address = x.Address,
                        City = x.City,
                        Country = x.Country,
                        ContactName = x.ContactName,
                        Phone = x.Phone,
                        PostalCode = x.PostalCode,
                        Fax = x.Fax,
                        Region = x.Region
                    }).ToListAsync(cancellationToken);
                return new ExportFeature
                {
                    Content = _excelConverter.Convert(VelData),
                    ContentType = "application/vnd.ms-excel",
                    FileName = $"Customer.xlsx"
                };
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
