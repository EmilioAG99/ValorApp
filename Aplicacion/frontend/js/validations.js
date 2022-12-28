var activate=0;
function validateName(name)
{
    if(name.value.length<5)
    {
        alert('Name must be at least 5 characters');
        activate=0
    }
    else 
    {
        activate=1;
    }
}
function validatePassword(password)
{
    if(password.value.length<5)
    {
        console.log(password.value);
        alert('Password must be at least 5 characters');
    }
    else 
    {
        if(activate==1)
        {
            document.getElementById("botonSubmit").disabled = false;
        } 
        else{
            alert('Check your form')
        }
    }
}