exports.getStuff = function (callback) {
  callback('Hello from Zerver');
};

exports.handleFormRequest = handleFormRequest;
handleFormRequest.type = 'GET';

function handleFormRequest(params, callback) {
  // console.log(params.data);
  // console.log('hi');
  callback({ success: true });
}

exports.updateData = updateData;

updateData.type = 'POST';
function updateData(params, callback) {
  // params.data == { random: 'json' }
  console.log(params.data);
  callback({ success: true });
}
