class QuoteModel {
  final String name;
  final String phone;
  final String email;
  final String college;
  final String service;
  final String message;

  QuoteModel({
    required this.name,
    required this.phone,
    required this.email,
    required this.college,
    required this.service,
    required this.message,
  });

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'phone': phone,
      'email': email,
      'college': college,
      'service': service,
      'message': message,
    };
  }
}
