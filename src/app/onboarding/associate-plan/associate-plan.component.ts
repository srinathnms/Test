import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rlg-onboarding-associate-plan',
  templateUrl: './associate-plan.component.html',
  styleUrls: ['./associate-plan.component.css']
})
export class AssociatePlanComponent implements OnInit {
  associatePlans: any[];
  currentInputFilePath;
  currentInputFileIndex;

  constructor() { }

  ngOnInit() {
    this.associatePlans = [
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: "test.txt"
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 1,
        filePath: null
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: null
      }, {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 1,
        filePath: "test.txt"
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: "test.txt"
      }, {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 1,
        filePath: "test.txt"
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: "test.txt"
      }, {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 1,
        filePath: "test.txt"
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: "test.txt"
      }, {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 1,
        filePath: "test.txt"
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: null
      }, {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 1,
        filePath: "test.txt"
      },
      {
        Week: 1,
        Day: 2,
        KnowledgeTransferTitle: 3,
        ScheduledDate: new Date("02-02-2019"),
        CompletionDate: new Date("02-02-2019"),
        ProofType: 2,
        filePath: "test.txt"
      }
    ]
  }

  onFileSelected(event, associateplan, index) {
    this.currentInputFilePath = null;
    this.currentInputFileIndex = null;
    if (event.target.files.length > 0) {
      associateplan.filePath = event.target.files[0].name;
      this.currentInputFileIndex = index;
      this.currentInputFilePath = event.target.files[0].name;
    }
  }
}