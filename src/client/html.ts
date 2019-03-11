const html = (body: string = "", title: string = "") => `
<!DOCTYPE html>
<html>
	<head>
		<title>${title}</title>
  	</head>
  	<body style="margin:0">
		<div id="app">${body}</div>
  	</body>
</html>
`;
export default html;