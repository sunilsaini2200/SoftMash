
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


namespace WebUI.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class OidcConfigurationController : Controller
    {
        private readonly ILogger<OidcConfigurationController> logger;
        private readonly IConfiguration configuration;
        public OidcConfigurationController(ILogger<OidcConfigurationController> _logger, IConfiguration _configuration)
        {
            logger = _logger;
            configuration = _configuration;
        }
        [HttpGet("_configuration/{clientId}")]
        public IActionResult GetClientRequestParameters([FromRoute] string clientId)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host.Value}";
            var ret = new
            {
                authority = configuration.GetValue<string>("Authority"),
                client_id = "tracktech-api",
                post_logout_redirect_uri = $"{baseUrl}/authentication/logout-callback",
                redirect_uri = $"{baseUrl}/authentication/login-callback",
                response_type = "code",
                scope = "openid profile tracktech offline_access"
            };
            return Ok(ret);
        }

        [HttpGet("_config/")]
        public IActionResult GetConfig([FromRoute] string clientId)
        {
            var ret = new
            {
                v1Uri = configuration.GetValue<string>("V1Uri")
            };
            return Ok(ret);
        }
    }
}
