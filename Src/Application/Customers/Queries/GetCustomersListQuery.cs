using Application.Common.Helper;
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


namespace Application.Customers.Queries
{
    public class GetCustomersListQuery : GridQuery, IRequest<GridResult<CustomerDto>>
    {
    }
    public class GetCustomersListQueryHandler : IRequestHandler<GetCustomersListQuery, GridResult<CustomerDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetCustomersListQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<GridResult<CustomerDto>> Handle(GetCustomersListQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var VelData = await _context.Set<Domain.Entities.Customer>()
                    .Select(x => new CustomerDto
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
                    }).DynamicPageAsync(request, cancellationToken);
                return VelData;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
