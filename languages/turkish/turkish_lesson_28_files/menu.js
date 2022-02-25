function montre(id)
{
	var d = document.getElementById(id);
	if (d)
	{
		if (d.style.display == 'block')
		{
			d.style.display='none';
		} else
		{
			d.style.display='block';
		}
	}
	return false;
}