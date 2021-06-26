using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class Result
    {
        internal Result(bool succeeded, IEnumerable<string> errors, object list)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
            lists = list;
        }

        public bool Succeeded { get; set; }

        public string[] Errors { get; set; }
        public object lists { get; set; }

        public static Result Success()
        {
            return new Result(true, new string[] { }, null);
        }

        public static Result Success(object list)
        {
            return new Result(true, new string[] { }, list);
        }
        public static Result Failure(IEnumerable<string> errors)
        {
            return new Result(false, errors, null);
        }
    }
}
