
// a simple page that displays an image of a cat with the status code of the error
function ErrorPage() {

    let url = 'https://http.cat/' + window.location.pathname.split('/')[2]

    if (window.location.pathname.split('/')[2] === '') {
        url = 'https://http.cat/404'
    }

  return (
    <div>
      <img src={url} alt={"image with url: "+url} />
    </div>
  );
}

export default ErrorPage;