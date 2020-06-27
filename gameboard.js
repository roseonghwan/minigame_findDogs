for (var i = 0; i < 3; i++) {
  document.write('<tr>');
  for (var j = 0; j < 8; j++) {
    document.write(
      "<td><img id='egg" +
        i +
        j +
        "' src='img1.gif' onclick='checkEgg(event)'></td>"
    );
  }
  document.write('</tr>');
}
