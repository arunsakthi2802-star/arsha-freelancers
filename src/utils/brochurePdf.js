export function generateServicesBrochure() {
  const link = document.createElement('a');
  link.href = '/Arsha_Brochure.pdf';
  link.download = 'Arsha_Freelancers_Brochure.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
