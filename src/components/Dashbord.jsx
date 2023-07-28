import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';
import Select from 'react-select';
import swal from 'sweetalert';
import { imgs } from '../asset/DataImg';

export default function Dashboard() { 
  const [data, setData] = useState({});
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const[deviseEntre,setDeviseEntre]=useState('');
  const[afficheDevise,setAfficheDevise]=useState('');
  const[theme,setTheme]=useState(false);

// aaefc358bbaa4927b009d0c6e65744b1

  useEffect(() => {
    axios.get('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=')
      .then((response) => {
        setData(response.data.rates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

useEffect(()=>{
    if(theme){
      document.body.classList.remove('body-light');
      document.body.classList.add('body-dark');
      document.querySelector('.parent').classList.remove("bg-light");
      document.querySelector('.parent').classList.add("bg-dark");
      document.querySelector('.titre').classList.add("text-light");
      document.querySelector('.description').classList.add("text-light");
      document.querySelector('.hr').classList.add("text-light");
      document.querySelector('.hr').classList.remove("text-dark");
      document.querySelector('.transier-part').classList.remove("bg1");
      document.querySelector('.transier-part').classList.add("bg2");
      document.querySelector('#devise-rslt').classList.remove("bg-devise");
      document.querySelector('#devise-rslt').classList.add("bg-devise2");
      document.querySelector('.transier-part').classList.remove("border");
     document.querySelector('.text-entre').classList.add('text-light');
     document.querySelector('.De').classList.add('text-light');
     document.querySelector('.Vers').classList.add('text-light');
     document.querySelector('.icon').classList.add('text-light');
     document.querySelector('.hr-footer').classList.add('text-light');
     document.querySelector('footer').classList.add('text-light');
    }else{
      document.body.classList.add('body-light');
      document.body.classList.remove('body-dark');
      document.querySelector('.parent').classList.add("bg-light");
      document.querySelector('.parent').classList.remove("bg-dark");
      document.querySelector('.titre').classList.remove("text-light");
      document.querySelector('.description').classList.remove("text-light");
      document.querySelector('.hr').classList.add("text-dark");
      document.querySelector('.hr').classList.remove("text-light");
      document.querySelector('.transier-part').classList.add("bg1");
      document.querySelector('.transier-part').classList.remove("bg2");
      document.querySelector('#devise-rslt').classList.add("bg-devise");
      document.querySelector('#devise-rslt').classList.remove("bg-devise2");

      document.querySelector('.transier-part').classList.add("border");
      document.querySelector('.text-entre').classList.remove('text-light');
      document.querySelector('.De').classList.remove('text-light');
      document.querySelector('.Vers').classList.remove('text-light');
      document.querySelector('.icon').classList.remove('text-light');
      document.querySelector('.hr-footer').classList.remove('text-light');
      document.querySelector('footer').classList.remove('text-light');
 
    }
    },[theme]);

    const handleCurrencySearch = () => {
      if (!deviseEntre) {
        swal('Erreur', 'Veuillez entrer une devise', 'error');
        return;
      } else {
        // Convert the user-entered value to uppercase
        const deviseEntreUpperCase = deviseEntre.toUpperCase();
    
        if (data[deviseEntreUpperCase]) {
          const exchangeRate = data[deviseEntreUpperCase];
          setAfficheDevise(exchangeRate);
        } else {
          swal('Erreur', 'Devise introuvable', 'error');
        }
      }
    };
    


  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption.value);
    setConvertedAmount('');
  };


  const handleTransfer = () => {
    if (!amount || isNaN(amount)) {
      swal('Erreur', 'Veuillez entrer un montant valide', 'error');
      return;
    }

    if (!fromCurrency || !toCurrency) {
      swal('Erreur', 'Veuillez choisir les devises', 'error');
      return;
    }

    if (fromCurrency && toCurrency && amount) {
      const converted = (amount * data[toCurrency]) / data[fromCurrency];
      setConvertedAmount(converted.toFixed(2));
    }
  };
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '120px',
    }),
   
  };
  
  return (
    <div className="container col-11 col-md-8 border rounded shadow-sm mt-2 p-3 parent">
      <div className="d-flex justify-content-between ">
        
        <h3 className='titre text-primary'>Transférer l'argent avec la devise de votre choix</h3>
        <label className="switch">
           <input type="checkbox" onClick={()=>setTheme(theme==true?false:true)}/><span className="slider"></span>
        </label>
      </div>
      <hr  className='hr'/>

      <div className='parnt d-flex justify-content-center gap-5'>
        
        <div className=' parnt-description'>
          <h5 className='text-primary'>Convertisseur de Devises <i class="bi bi-currency-dollar"></i></h5>
          <div className='mt-3 description d-flex flex-column gap-4'>
           <span> L'application de Convertisseur de Devises est un outil
            utile pour toute personne qui a besoin
            de convertir des montants entre différentes devises.</span>
            
            <div id='devise-rslt' className='bg-devise col-12 col-md-8'>

              <div className='text-primary mt-1'>Entrez une devise de pays et découvrez sa valeur sur le marché</div>
              <div className='d-flex gap-1 mt-3'>
                <div className=''>
                <input
              type='text'
              className='form-control' placeholder='entre le devise' value={deviseEntre}onChange={(e) => setDeviseEntre(e.target.value)}/>
              </div>
              <button className='btn btn-primary' onClick={handleCurrencySearch}>
            rechercher
          </button>

              </div>


               {afficheDevise && (
          <div className='bg-reslt-devise mt-2 d-flex justify-content-center'>
            <span className='text-light fw-bold'>{afficheDevise}</span>
          </div>
        )}
              </div>

          </div>
        </div>

        <div className="border col-12 col-md-6 rounded  p-4  d-flex flex-column gap-3 shadow-sm transier-part" >
          <div className='text-entre'>Entrez le montant que vous voulez voler</div>
          <div>
            <input type="number" className="form-control" value={amount} onChange={handleAmountChange} placeholder="Entrez le montant" />
          </div>

          <div className="d-flex justify-content-around align-items-center gap-3">
            <div>
              <div className='text-transier De'>De</div>

              <Select
              styles={customStyles}
              options={Object.keys(data).map((currency) => ({
                value: currency,
                label: (
                  <span>
                    {imgs[currency] ? (
                      <span className="d-flex gap-2 justify-content-center align-items-center">
                        {''}
                        <img width="20" src={imgs[currency]} alt={currency} />
                        {currency}
                      </span>
                    ) : (
                      currency
                    )}
                  </span>
                ),
              }))}
              onChange={handleFromCurrencyChange}
            />


            </div>

            <div className="icon">
              <i className="fas fa-exchange-alt"></i>
            </div>

            <div>
              <div className='text-transier Vers'>Vers</div>
              <Select
            styles={customStyles}
            options={Object.keys(data).map((currency) => ({
              value: currency,
              label: (
                  <span>
                    {imgs[currency] ? (
                      <span className="d-flex gap-2 justify-content-center align-items-center">
                        {''}
                        <img width="20" src={imgs[currency]} alt={currency} />
                        {currency}
                      </span>
                    ) : (
                      currency
                    )}
                  </span>
              ),
            }))}
            onChange={handleToCurrencyChange}
          />
             
            </div>
          </div>

          <div id="divRslt">
            <span id="rslt">{convertedAmount ? <b>{convertedAmount}</b> : "00"}</span>
          </div>
          <div id="divBtn">
            <button type="button" className='btn btn-primary col-11' onClick={handleTransfer}>Transférer</button>
          </div>
        </div>
      </div>
      <span className='d-flex flex-column align-items-center justify-content-center mt-3'>
          <hr className='hr-footer w-50'/>
          
          <footer >
            Pour voir plus de projets ou signaler un problème sur notre site,
            <br/> n'hésitez pas à visiter notre page Facebook : <a href="https://www.facebook.com/elghandori1?mibextid=ZbWKwL" title='MG-code' target="_blank"><i class="bi bi-facebook"></i> MG-code</a>
          </footer>
         
     
      </span>
    
       
       
      
    </div>
  );
}
