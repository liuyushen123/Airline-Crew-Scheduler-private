using System;

interface IRecord
{
  Guid recordGuid { get; }

  List<Update> updates { get; set; }

  RecordController recordController { get; set; }

  void AddUpdate(Update update);
}
