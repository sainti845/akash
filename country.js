const countryName = new URLSearchParams(location.search).get('name')
const flagImage=document.querySelector('.country-details img');
const countryNameH1=document.querySelector('.country-details h1');
const nativeName=document.querySelector('.native-name')
const population=document.querySelector('.populations')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.Top-Level-Domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries=document.querySelector('.border-countries')
const themeChanger=document.querySelector('.theme-changer');



fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{

     
   // console.log(country.name.nativeName);
    flagImage.src=country.flags.svg;
    countryNameH1.innerText= country.name.common;
    population.innerText = country.population;
    region.innerText = country.region;
    if(country.subRegion){
    subRegion.innerText = country.subregion;
    }
    if(country.capital){
    capital.innerText = country.capital;
    }
    topLevelDomain.innerText= country.tld.join(", ");
    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;

    }else{
        nativeName.innerText = country.name.common;
    }
    if(country.currencies)
    {
        currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(" , ");
    }else{
        currencies.innerText=0;
    }
    if(country.languages)
    {
        languages.innerText=Object.values(country.languages).join(" , ");
    }
    if(country.borders)
    {
        country.borders.forEach(border => {
            console.log(border);
            fetch(` https://restcountries.com/v3.1/alpha/${border} `).then(res=>res.json())
            .then(([data])=>{


                const bordercountryTag=document.createElement('a');
                bordercountryTag.innerText=data.name.common;
                bordercountryTag.href=`/country.html?name=${data.name.common}`;
                borderCountries.append(bordercountryTag);
                console.log(bordercountryTag.innerText);

                
            })
        });

    }
    



})



themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
})















