using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class GridResult<T>
    {
        public IList<T> Data { get; set; }
        public int Total { get; set; }
        public int Page { get; set; }

    }
}
