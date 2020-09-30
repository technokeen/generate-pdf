import { Component } from '@angular/core';
import { Record } from './record';
import { ScriptService } from './script.service';
declare let pdfMake: any ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  record = new Record();

  constructor(private scriptService: ScriptService) {
    this.record = JSON.parse(sessionStorage.getItem('record')) || new Record();
    
    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
    }
  }

  getDocumentDefinition() {
    sessionStorage.setItem('record', JSON.stringify(this.record));
    return {
          content:[
                      {
                          
                          columns: [

                                       this.getRecordPicObject(),
                                      
                                      {
                                          table: {
                                          
                                          body: [
                                                    
                                                    [ {text: [
                                                        {text:'Aim: '},
                                                        {text:this.record.aim},
                                                        
                                                        ]   
                                                    
                                                      },
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Theory:\n '},
                                                          {text:this.record.theory}

                                                          ]
                                                      }
                                                    ],
                                                    [
                                                      {text:[
                                                          {text:'Material Required:\n '},
                                                          {text:this.record.material}

                                                          ]
                                                      }
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Procedure:\n '},
                                                          {text:this.record.procedure}

                                                          ]
                                                      }
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Calculation and Discussion:\n '},
                                                          {text:this.record.calculation}

                                                          ]
                                                      }
                                                    ],
                                                     [
                                                      {text:[
                                                          {text:'Analysis:\n '},
                                                          {text:this.record.analysis}

                                                          ]
                                                      }
                                                    ]


                                                 ]
                                                  }
                                      }
                                    ],
                                    columnGap:20
                      },

                  ]   
            };
  }

  getRecordPicObject() {
    if (this.record.recordPic) {
      return {
        image: this.record.recordPic ,
        width: 200,
        height:400,
        alignment : 'left'
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.record.recordPic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

}