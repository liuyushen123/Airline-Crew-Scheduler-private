namespace Server.Model.Update
{
  public interface IUpdateRecord
  {
    int UpdateId { get; set; }
    DateTime UpdateTime { get; set; }
    string UpdateType { get; set; }
    string Description { get; set; }
  }
}