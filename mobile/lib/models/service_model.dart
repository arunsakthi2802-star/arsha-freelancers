class ServiceModel {
  final String id;
  final String serviceName;
  final String description;
  final String icon;
  final List<String> features;
  final String priceRange;
  final String status;

  ServiceModel({
    required this.id,
    required this.serviceName,
    required this.description,
    required this.icon,
    required this.features,
    required this.priceRange,
    required this.status,
  });

  factory ServiceModel.fromJson(Map<String, dynamic> json) {
    return ServiceModel(
      id: json['_id'] ?? json['id'] ?? '',
      serviceName: json['serviceName'] ?? json['name'] ?? '',
      description: json['description'] ?? '',
      icon: json['icon'] ?? 'Code',
      features: json['features'] != null
          ? List<String>.from(json['features'])
          : [],
      priceRange: json['priceRange'] ?? 'Custom Quote',
      status: json['status'] ?? 'active',
    );
  }
}
