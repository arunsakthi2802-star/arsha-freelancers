class ProjectModel {
  final String id;
  final String title;
  final String department;
  final String category;
  final String domain;
  final String abstractText;
  final List<String> techStack;
  final String difficulty;
  final String? image;
  final String? codeUrl;

  ProjectModel({
    required this.id,
    required this.title,
    required this.department,
    required this.category,
    required this.domain,
    required this.abstractText,
    required this.techStack,
    required this.difficulty,
    this.image,
    this.codeUrl,
  });

  factory ProjectModel.fromJson(Map<String, dynamic> json) {
    return ProjectModel(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      department: json['department'] ?? 'CSE',
      category: json['category'] ?? 'IEEE 2026',
      domain: json['domain'] ?? 'Artificial Intelligence',
      abstractText: json['abstract'] ?? json['description'] ?? '',
      techStack: json['techStack'] != null
          ? List<String>.from(json['techStack'])
          : ['Python', 'Flutter', 'MongoDB'],
      difficulty: json['difficulty'] ?? 'Advanced',
      image: json['image'],
      codeUrl: json['codeUrl'],
    );
  }
}
