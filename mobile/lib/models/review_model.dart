class ReviewModel {
  final String id;
  final String studentName;
  final String collegeName;
  final String projectTitle;
  final int rating;
  final String reviewText;
  final String? studentAvatar;
  final String approvalStatus;

  ReviewModel({
    required this.id,
    required this.studentName,
    required this.collegeName,
    required this.projectTitle,
    required this.rating,
    required this.reviewText,
    this.studentAvatar,
    required this.approvalStatus,
  });

  factory ReviewModel.fromJson(Map<String, dynamic> json) {
    return ReviewModel(
      id: json['_id'] ?? json['id'] ?? '',
      studentName: json['studentName'] ?? json['name'] ?? 'Student',
      collegeName: json['collegeName'] ?? json['college'] ?? '',
      projectTitle: json['projectTitle'] ?? json['project'] ?? 'Academic Project',
      rating: json['rating'] is num ? (json['rating'] as num).toInt() : 5,
      reviewText: json['reviewText'] ?? json['comment'] ?? '',
      studentAvatar: json['studentAvatar'] ?? json['avatar'],
      approvalStatus: json['approvalStatus'] ?? 'approved',
    );
  }
}
