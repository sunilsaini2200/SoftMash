using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public class Change
    {
        public Change()
        {
            this.Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Entities { get; set; }
        public string Changes { get; set; }
        public string ChangeBy { get; set; }
        public DateTime Changed { get; set; }
    }
}
