class Update
{
  public Update(string description)
  {
    updateNumber = DateTime.Today.ToString();
    this.description = description;
  }
  public string updateNumber { get; set; }
  public string description { get; set; }
}