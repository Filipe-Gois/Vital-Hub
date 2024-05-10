using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        VitalContext ctx = new VitalContext();

        public Paciente AtualizarPerfil(Guid Id, PacienteViewModel paciente)
        {
            try
            {
                Paciente pacienteBuscado = ctx.Pacientes
                .Include(x => x.Endereco)
                .Include(x => x.IdNavigation)
                .FirstOrDefault(x => x.Id == Id)! ?? throw new Exception("Paciente não encontrado!");

                //if (paciente.Foto != null)
                //    pacienteBuscado!.IdNavigation.Foto = paciente.Foto;



                pacienteBuscado!.DataNascimento = paciente.DataNascimento;

                pacienteBuscado.Rg = paciente.Rg;


                pacienteBuscado!.Cpf = paciente.Cpf;


                pacienteBuscado!.Endereco!.Logradouro = paciente.Logradouro;


                pacienteBuscado!.Endereco!.Numero = paciente.Numero;


                pacienteBuscado!.Endereco!.Cep = paciente.Cep;


                pacienteBuscado!.Endereco!.Cidade = paciente.Cidade;

                ctx.Pacientes.Update(pacienteBuscado!);
                ctx.SaveChanges();

                return pacienteBuscado!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idPaciente)
        {
            try
            {
                return ctx.Consultas
                 .Include(x => x.Situacao)
                 .Include(x => x.Prioridade)
                 .Include(x => x.MedicoClinica)
                 .Include(x => x.MedicoClinica!.Medico)
                 .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                 .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
                 .Include(x => x.Paciente)
                 .Include(x => x.Paciente!.IdNavigation)
                 .Include(x => x.Receita)

                 // diferença em dias entre a Data da Consulta e a dataConsulta é igual a 0.
                 .Where(x => x.PacienteId == idPaciente && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                 .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Paciente BuscarPorId(Guid Id)
        {
            try
            {
                return ctx.Pacientes
                .Include(x => x.IdNavigation)
                .Include(x => x.Endereco)
                .FirstOrDefault(x => x.Id == Id)!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(Usuario user)
        {
            try
            {
                string paciente = "Paciente";
                TiposUsuario tipoPaciente = ctx.TiposUsuarios.FirstOrDefault(x => x.TipoUsuario == paciente)! ?? throw new Exception("Não existe um tipo usuário paciente no banco de dados!");

                user.TipoUsuario = tipoPaciente;
                user.Senha = Criptografia.GerarHash(user.Senha!);
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> ListarProximasConsultasPaciente(Guid idPaciente)
        {
            //return ctx.Consultas
            //    .Include(x => x.MedicoClinica)
            //   .Include(x => x.MedicoClinica!.Medico)
            //    .Include(x => x.MedicoClinica!.Medico!.Especialidade)
            //    .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
            //    .Include(x => x.Situacao)
            //    .Include(x => x.Prioridade)
            //    .Where(c => c.PacienteId == idPaciente && c.DataConsulta > DateTime.Now && c.Situacao!.Situacao == "Pendente").ToList();

            return ctx.Consultas
       .Include(x => x.MedicoClinica)
       .Include(x => x.MedicoClinica!.Medico)
       .Include(x => x.MedicoClinica!.Medico!.Especialidade)
       .Include(x => x.MedicoClinica!.Medico!.IdNavigation)
       .Include(x => x.Situacao)
       .Include(x => x.Prioridade)
       .Where(c => c.PacienteId == idPaciente && c.DataConsulta > DateTime.Now && c.Situacao!.Situacao == "Pendente")
       .Select(c => new Consulta
       {
           Id = c.Id,
           DataConsulta = c.DataConsulta,



           MedicoClinica = new MedicosClinica
           {

               Id = c.MedicoClinica!.Id,
               ClinicaId = c.MedicoClinica!.ClinicaId,

               Medico = new Medico
               {
                   Crm = c.MedicoClinica.Medico!.Crm,

                   Especialidade = new Especialidade
                   {
                       Especialidade1 = c.MedicoClinica.Medico.Especialidade!.Especialidade1,
                   },

                   IdNavigation = new Usuario
                   {
                       Nome = c.MedicoClinica.Medico.IdNavigation.Nome,
                       Foto = c.MedicoClinica.Medico.IdNavigation.Foto,


                   }


               }

           },

           Situacao = new SituacaoConsulta
           {
               Situacao = c.Situacao!.Situacao,
           },

           Prioridade = new NiveisPrioridade
           {
               Prioridade = c.Prioridade!.Prioridade
           }
           // Projetar apenas as propriedades necessárias
       })
       .ToList();


        }
    }
}
