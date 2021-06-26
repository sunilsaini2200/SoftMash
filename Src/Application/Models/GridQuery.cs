using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class GridQuery
    {
        public Dictionary<string, string> Filter { get; set; }
        public string Sort { get; set; }
        public bool Ascending { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public long Id { get; set; }
    }
}
