using Application.Customers.Queries;
using Application.ExportFiles.ExportCustmor;
using Application.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class EmployeesController : ApiController
    {
        [HttpPost("[action]")]
        public async Task<ActionResult<GridResult<CustomerDto>>> GetCustomersQuery(GetCustomersListQuery request)
        {
            return await Mediator.Send(request);
        }
        [HttpPost("[action]")]
        public async Task<FileResult> ExportCustmor(ExportCustmors request)
        {
            var vm = await Mediator.Send(request);
            return File(vm.Content, vm.ContentType, vm.FileName);
        }
    }
    
}
