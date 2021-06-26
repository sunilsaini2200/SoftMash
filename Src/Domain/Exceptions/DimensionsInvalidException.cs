using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions
{
    public class DimensionsInvalidException : Exception
    {
        public DimensionsInvalidException(string dimensionsString, Exception ex)
            : base($"Dimension \"{dimensionsString}\" is invalid.", ex) { }
    }
}
