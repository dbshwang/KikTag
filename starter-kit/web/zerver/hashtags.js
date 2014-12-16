exports.handleFormRequest = handleFormRequest;
// handleFormRequest.type = 'POST';

function handleFormRequest(params, callback) {
  console.log(params.data);

  callback('test');
}
