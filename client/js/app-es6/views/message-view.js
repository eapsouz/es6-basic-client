import {View} from './view';

export class MessageView extends View {
    
    constructor(elemento) {
        
       super(elemento);
    }
    
   template(model) {
       
       return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
   }
}