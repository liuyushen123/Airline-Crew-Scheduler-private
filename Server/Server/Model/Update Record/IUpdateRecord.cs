namespace Server.Model.Update
{
    public interface IUpdateRecord
    {
        Guid UpdateId { get; set; }
        DateTime UpdateTime { get; set; }
        string EntityName { get; set; }
        Guid EntityId { get; set; }
        string UpdateType { get; set; }
        string User { get; set; }


    }
}