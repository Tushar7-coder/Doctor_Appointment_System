const formatData = (data,config) =>{
	const defaultOptions = {day : 'numeric', month : 'long', year : 'numeric'}
	const options = config ? config : defaultOptions ;
	return new Date(data).toLocaleDateString('en-us',options);

}
export default formatData