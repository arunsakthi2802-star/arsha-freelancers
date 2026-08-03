class UserModel {
  final String id;
  final String fullName;
  final String email;
  final String role; // 'user', 'manager', 'admin'
  final String? phone;
  final String? college;
  final String? department;

  UserModel({
    required this.id,
    required this.fullName,
    required this.email,
    required this.role,
    this.phone,
    this.college,
    this.department,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id'] ?? json['id'] ?? '',
      fullName: json['fullName'] ?? json['name'] ?? 'User',
      email: json['email'] ?? '',
      role: json['role'] ?? 'user',
      phone: json['phone'],
      college: json['college'],
      department: json['department'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'fullName': fullName,
      'email': email,
      'role': role,
      'phone': phone,
      'college': college,
      'department': department,
    };
  }
}
