using System;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;


namespace WebAPI.Utils
{
    public class IpFunctions
    {
        public static string GetIpv4()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());


            foreach (var ip in host.AddressList)
            {
                if (ip == host.AddressList[6])
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }


    }
}
