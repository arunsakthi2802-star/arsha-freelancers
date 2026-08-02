import 'dart:io';
import 'package:flutter/foundation.dart';

class ApiEndpoints {
  // Determine backend host dynamically depending on platform
  static String get baseUrl {
    if (kIsWeb) {
      return "http://localhost:5000/api";
    } else if (Platform.isAndroid) {
      // 10.0.2.2 points to host machine from Android emulator
      return "http://10.0.2.2:5000/api";
    } else {
      return "http://localhost:5000/api";
    }
  }

  // Auth Routes
  static String get login => "$baseUrl/auth/login";
  static String get register => "$baseUrl/auth/register";
  static String get getMe => "$baseUrl/auth/me";

  // Data Resources Routes
  static String get projects => "$baseUrl/projects";
  static String get services => "$baseUrl/services";
  static String get gallery => "$baseUrl/gallery";
  static String get stories => "$baseUrl/stories";
  static String get reviews => "$baseUrl/reviews";
  static String get contact => "$baseUrl/contact";
  static String get stats => "$baseUrl/stats";
  static String get chat => "$baseUrl/chat";
  static String get search => "$baseUrl/search";
  static String get payments => "$baseUrl/payments";
  static String get tasks => "$baseUrl/tasks";
  static String get users => "$baseUrl/users";
  static String get approvals => "$baseUrl/approvals";
}
