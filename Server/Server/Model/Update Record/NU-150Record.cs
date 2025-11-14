class GBR10Record : IRecord
{
  public NU150Record(string description)
  {
    updateNumber =  "NU150-" + DateTime.Today.ToString();
    this.description = description;
  }
  public string updateNumber { get; set; }
  public string description { get; set; }
}