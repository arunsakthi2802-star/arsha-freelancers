import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:dio/dio.dart';
import '../core/network/api_client.dart';
import '../core/constants/api_endpoints.dart';
import '../models/user_model.dart';

class AuthProvider extends ChangeNotifier {
  UserModel? _user;
  bool _isLoading = false;
  String? _errorMessage;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  UserModel? get user => _user;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _user != null;
  String? get errorMessage => _errorMessage;

  AuthProvider() {
    checkAuthStatus();
  }

  Future<void> checkAuthStatus() async {
    _isLoading = true;
    notifyListeners();

    try {
      final token = await _storage.read(key: 'arsha_jwt_token');
      if (token != null && token.isNotEmpty) {
        final response = await ApiClient().client.get(ApiEndpoints.getMe);
        if (response.statusCode == 200 && response.data['success'] == true) {
          _user = UserModel.fromJson(response.data['user'] ?? response.data['data']);
        } else {
          await logout();
        }
      }
    } catch (e) {
      _user = null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await ApiClient().client.post(
        ApiEndpoints.login,
        data: {'email': email, 'password': password},
      );

      if (response.statusCode == 200 && response.data['success'] == true) {
        final token = response.data['token'];
        await _storage.write(key: 'arsha_jwt_token', value: token);
        _user = UserModel.fromJson(response.data['user'] ?? response.data['data']);
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _errorMessage = response.data['message'] ?? 'Login failed';
      }
    } on DioException catch (e) {
      _errorMessage = e.response?.data['message'] ?? 'Network error. Please check backend connection.';
    } catch (e) {
      _errorMessage = 'An unexpected error occurred';
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<bool> register({
    required String fullName,
    required String email,
    required String password,
    String? phone,
    String? college,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      final response = await ApiClient().client.post(
        ApiEndpoints.register,
        data: {
          'fullName': fullName,
          'email': email,
          'password': password,
          'phone': phone,
          'college': college,
        },
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        final token = response.data['token'];
        if (token != null) {
          await _storage.write(key: 'arsha_jwt_token', value: token);
          _user = UserModel.fromJson(response.data['user'] ?? response.data['data']);
        }
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _errorMessage = response.data['message'] ?? 'Registration failed';
      }
    } on DioException catch (e) {
      _errorMessage = e.response?.data['message'] ?? 'Registration failed. Please check inputs.';
    } catch (e) {
      _errorMessage = 'An error occurred during registration.';
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  Future<void> logout() async {
    await _storage.delete(key: 'arsha_jwt_token');
    _user = null;
    notifyListeners();
  }
}
