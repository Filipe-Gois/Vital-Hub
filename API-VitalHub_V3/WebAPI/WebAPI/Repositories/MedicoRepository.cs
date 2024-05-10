using Microsoft.EntityFrameworkCore;
using System.Linq;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Utils;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{

    public class MedicoRepository : IMedicoRepository
    {
        VitalContext ctx = new VitalContext();

        public Medico AtualizarPerfil(Guid Id, MedicoViewModel medico)
        {
            try
            {
                Medico medicoBuscado = ctx.Medicos
                    .Include(x => x.Endereco)
                    .Include(x => x.Especialidade)
                    .FirstOrDefault(x => x.Id == Id)! ?? throw new Exception("Médico não encontrado!");

                //if (medico.Foto != null)
                //    medicoBuscado.IdNavigation.Foto = medico.Foto;


                //medicoBuscado.EspecialidadeId = medico.EspecialidadeId;


                medicoBuscado.Crm = medico.Crm;

                medicoBuscado.Endereco!.Logradouro = medico.Logradouro;


                medicoBuscado.Endereco!.Numero = medico.Numero;


                medicoBuscado.Endereco!.Cep = medico.Cep;


                medicoBuscado.Endereco!.Cidade = medico.Cidade;

                ctx.Medicos.Update(medicoBuscado);
                ctx.SaveChanges();

                return medicoBuscado;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> BuscarPorData(DateTime dataConsulta, Guid idMedico)
        {
            try
            {
                return ctx.Consultas
                     .Include(x => x.Situacao)
                     .Include(x => x.Prioridade)
                     .Include(x => x.MedicoClinica)
                     .Include(x => x.Paciente!.IdNavigation)
                     .Include(x => x.MedicoClinica!.Medico)
                     .Include(x => x.MedicoClinica!.Medico!.Especialidade)
                     .Include(x => x.Receita)
                     // diferença em dias entre a Data da Consulta e a dataConsulta é igual a 0.
                     .Where(x => x.MedicoClinica!.MedicoId == idMedico && EF.Functions.DateDiffDay(x.DataConsulta, dataConsulta) == 0)
                     .ToList();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public Medico BuscarPorId(Guid Id)
        {
            try
            {
                Medico medicoBuscado = ctx.Medicos
                    .Include(m => m.IdNavigation)
                    .Include(x => x.Especialidade)
                    .Include(m => m.Endereco)
                    .FirstOrDefault(m => m.Id == Id)!;

                return medicoBuscado;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Medico> ListarTodos()
        {
            try
            {
                return ctx.Medicos.
                    Include(m => m.IdNavigation)
                    .Select(m => new Medico
                    {
                        Id = m.Id,
                        Crm = m.Crm,
                        Especialidade = m.Especialidade,


                        IdNavigation = new Usuario
                        {
                            Nome = m.IdNavigation.Nome,
                            Foto = m.IdNavigation.Foto
                        }
                    })
                    .ToList();

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
                user.Senha = Criptografia.GerarHash(user.Senha!);
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Medico> ListarPorClinica(Guid id)
        {
            try
            {

                List<Medico> medicos = ctx.MedicosClinicas

                    .Where(mc => mc.ClinicaId == id)

                    .Select(mc => new Medico
                    {
                        Id = mc.Id,
                        Crm = mc.Medico!.Crm,
                        Especialidade = mc.Medico.Especialidade,

                        IdNavigation = new Usuario
                        {
                            Id = mc.Medico.IdNavigation.Id,
                            Nome = mc.Medico.IdNavigation.Nome,
                            Email = mc.Medico.IdNavigation.Email,
                            Foto = mc.Medico.IdNavigation.Foto
                        }
                    })
                    .ToList();

                return medicos;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<Consulta> ListarProximasConsultasMedico(Guid idMedico)
        {
            try
            {
                return ctx.Consultas
                    .Include(x => x.MedicoClinica)
                    .Include(x => x.Paciente)
                    .Include(x => x.Paciente!.IdNavigation)
                    .Include(x => x.Situacao)
                    .Include(x => x.Prioridade)
                    .Where(x => x.MedicoClinica!.MedicoId == idMedico && x.DataConsulta > DateTime.Now && x.Situacao!.Situacao == "Pendente")
                    .Select(c => new Consulta
                    {
                        Id = c.Id,
                        DataConsulta = c.DataConsulta,

                        Paciente = new Paciente
                        {
                            Id = c.Paciente!.Id,
                            DataNascimento = c.Paciente!.DataNascimento,

                            IdNavigation = new Usuario
                            {
                                Nome = c.Paciente!.IdNavigation.Nome,
                                Foto = c.Paciente!.IdNavigation.Foto,

                            }
                        },

                        MedicoClinica = new MedicosClinica
                        {

                            Id = c.MedicoClinica!.Id,
                            ClinicaId = c.MedicoClinica!.ClinicaId,


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
            catch (Exception)
            {

                throw;
            }
        }
    }
}
