using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Extensions.DependencyInjection;
using MODEL.DTOs;
using MODEL;
using REPOSITORY.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using BAL.IServices;
using BAL.Services;

namespace BAL.Shared
{
    public class ServiceManager
    {
        public static void SetServiceInfo(IServiceCollection services, AppSettings appSettings)
        {
            // Debug: Check if appSettings and ConnectionStrings are populated
            Console.WriteLine($"AppSettings is null: {appSettings == null}");
            Console.WriteLine($"ConnectionStrings value: '{appSettings?.ConnectionStrings}'");
            Console.WriteLine($"LocalTestUrl value: '{appSettings?.LocalTestUrl}'");

            if (string.IsNullOrEmpty(appSettings?.ConnectionStrings))
            {
                throw new InvalidOperationException("ConnectionStrings is null or empty in AppSettings");
            }

            services.AddDbContextPool<DataContext>(options =>
            {
                options.UseSqlServer(appSettings.ConnectionStrings);
            });

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IConfirmOrderService, ConFirmOrderService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<CommonAuthentication>();

        }
    }
}
