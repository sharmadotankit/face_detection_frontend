import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmitBtnClick}) =>{
    return(
        <div>

           <p>
               {'Paste the link in the input box and Click button to detect faces!!'}
           </p>
           <div id="errorEntries" style={{color:'yellow',fontSize:'13px',fontFamily:'Courier',fontWeight:'bolder'}}></div>
           <div className="imageLinkBtn shadow-5 pa4 br3 ba">
               <input 
               className="f4 center w-70 pa2 shadow-3 bg-lightest-blue "
               type="text" 
               onChange={onInputChange}   
               />
               <button 
               className="pa3 w-30 bg-light-purple grow link ph3 pv2 dib white"
               onClick={onSubmitBtnClick}
               >
               Detect
               </button>
           </div>
        </div>
        );
}

export default ImageLinkForm;