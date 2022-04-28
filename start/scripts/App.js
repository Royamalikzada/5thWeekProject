import { FileDoc } from "./FileDoc.js";
import { UserInterface } from "./UserInterface.js";
/*importa le due classi definite negli altri files*/
export class App{
     ui = new UserInterface();
     files= [];
     openFile = null;
     idFile=-1;
    /* costruttore: i dati sono presi dal file editor.js che contengono gli id dell'html, che istanzia una nuova app e tramite il costruttore assegna i valori all'istanza di UserInterface  */
    constructor(_ui){ 
        this.ui = _ui;

    /*inizializza tinymce, passando il riferimento all html tramite la proprietà dell'oggetto*/
    tinymce.init({
        selector: `#${this.ui.editor}`
        });
    // quando nei metodi dovrò usare tinymce.get(this.ui.editor) avrò due metodi .setContent() e .getContent()
    /*assegnare le proprietà dell'oggetto riferendosi al DOM e passando la proprietà dell'oggetto UserInterface come sopra*/
    this.save = document.querySelector(`#${this.ui.save}`);
    this.title = document.querySelector(`#${this.ui.title}`);
    this.editor = document.querySelector(`#${this.ui.editor}`);
    this.file = document.querySelector(`#${this.ui.file}`);
    this.new = document.querySelector(`#${this.ui.new}`);
    /* chiamare il metodo che fa il bind dell'evento click */
    this.clickBtn (); 
    /* chiamare il metodo che recupera i dati dal localStorage*/
    this.checkStorage(); 
}
    /* metodo che fa il bind sul click, attenzione all'uso di this*/
    clickBtn (){
        this.save.addEventListener("click", this.saveDoc.bind(this));
        this.new.addEventListener("click", this.newDoc.bind(this))
    }
    /* metodo che recupera i dati nel localStorage*/
    checkStorage(){
        if(localStorage.getItem("files")) {
            this.files = JSON.parse(localStorage.getItem("files"));
            this.print(); 
        } 
    }
    /* metodo che carica l'oggetto file */
    
    caricaFile(el) {
        this.idFile = el.target.dataset.id;
        this.openFile = new FileDoc(this.files[this.idFile].title, this.files[this.idFile].text);
        this.title.value =this.openFile.title;
        tinymce.get(this.ui.editor).setContent(this.openFile.text); 
    }
    /* metodo che ripulisce */
    newDoc(){
      this.clean();  
    }

    saveDoc() {
        if(this.openFile==null){
            let file = new FileDoc();
            file.title = this.title.value;
            file.text = tinymce.get(this.ui.editor).getContent();
            this.files.push(file);
       } else {
        this.openFile.text = tinymce.get(this.ui.editor).getContent(); 
        this.openFile.title = this.title.value;
        this.files[this.idFile] = this.openFile;
       }
       localStorage.setItem("files", JSON.stringify(this.files));
       this.print();
    }
    print(){
        this.clean();
        this.file.innerHTML = "";
        this.files.forEach((el,index)=> {
            this.file.innerHTML += (`<li data-id="${index}" class="list-group-item lists">${el.title} ${el.text}</li>`)
        });
        $(".lists").click(this.caricaFile.bind(this));
    }

    clean() {
        this.title.value = "";
        tinymce.get(this.ui.editor).setContent('');
        this.openFile = null;
    }

    /* altro metodo: se non ci sono file caricati crea un oggetto file e fa il push nell'array */
    /* altrimenti modifica il file assegnando i valori letti dal form*/
    /* salva l'array nel localStorage e chiama la funzione che stampa a video*/

    /* metodo che stampa a video */

    /* metodo che svuota il form */
    
}

