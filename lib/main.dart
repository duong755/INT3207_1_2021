import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  static const textStyle = TextStyle(
    fontSize: 18.0,
  );
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        primarySwatch: Colors.deepOrange,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text("INT3207 1"),
        ),
        body: Container(
          child: Text(
            "wemap",
            style: textStyle,
          ),
        ),
      ),
    );
  }
}
