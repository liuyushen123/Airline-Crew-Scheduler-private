using Server.Model.Database;
namespace Server.Controller.Validation;

public interface IValidation
{
    IDatabaseService DatabaseService { get; set; }
    bool Validate(object entity);
}
