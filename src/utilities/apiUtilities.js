export default function outputFilterString(b, i, y){
    let filterString ="";
    if(b!=null && b !=='All Boroughs'){
        filterString += filterString.length == 0 ? "?incidentborough="+b : "&incidentborough="+b 
    }
    if(i != null && i !=='All Incidents'){
        filterString += filterString.length == 0 ? "?incidentclassification="+i : "&incidentclassification="+i 
    }
    if(y != null){
        filterString += filterString.length == 0 ? "?yearmonth=FY "+y.year() : "&yearmonth=FY "+y.year();
    }
    return filterString;
}