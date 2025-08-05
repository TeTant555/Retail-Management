using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MODEL.DTOs;
using MODEL.Entities;

namespace BAL.IServices;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetAllOrders();
    Task<OrderResponseDTO> GetOrderById(int id);
    Task<OrderResponseDTO> CreateOrder(OrderRequestDTO requestDTO);
    Task<OrderResponseDTO> UpdateOrder(int id, OrderRequestDTO requestDTO);
    Task<OrderResponseDTO> DeleteOrder(int id);
}
