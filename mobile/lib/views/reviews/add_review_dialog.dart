import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/review_provider.dart';
import '../../widgets/custom_button.dart';

class AddReviewDialog extends StatefulWidget {
  final bool isDark;

  const AddReviewDialog({super.key, required this.isDark});

  static void show(BuildContext context, bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AddReviewDialog(isDark: isDark),
    );
  }

  @override
  State<AddReviewDialog> createState() => _AddReviewDialogState();
}

class _AddReviewDialogState extends State<AddReviewDialog> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _collegeController = TextEditingController();
  final _projectController = TextEditingController();
  final _reviewController = TextEditingController();
  double _rating = 5.0;
  bool _isSubmitting = false;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: widget.isDark ? AppColors.dark200 : AppColors.light100,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      title: Text(
        'Submit Student Review',
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: widget.isDark ? Colors.white : AppColors.textLightPrimary,
        ),
      ),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Rate your experience:',
                style: TextStyle(
                  fontSize: 12,
                  color: widget.isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                ),
              ),
              const SizedBox(height: 8),
              RatingBar.builder(
                initialRating: 5,
                minRating: 1,
                direction: Axis.horizontal,
                allowHalfRating: false,
                itemCount: 5,
                itemSize: 28,
                itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
                itemBuilder: (context, _) => const Icon(LucideIcons.star, color: Colors.amber),
                onRatingUpdate: (rating) {
                  setState(() => _rating = rating);
                },
              ),
              const SizedBox(height: 14),

              _buildField('Full Name', _nameController, 'e.g. Anand R'),
              const SizedBox(height: 10),
              _buildField('College & Degree', _collegeController, 'e.g. Government College of Engg'),
              const SizedBox(height: 10),
              _buildField('Project Title', _projectController, 'e.g. AI Health Monitoring'),
              const SizedBox(height: 10),
              _buildField('Your Feedback', _reviewController, 'Write about your experience...', maxLines: 3),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancel', style: TextStyle(color: Colors.grey)),
        ),
        CustomButton(
          text: 'Submit Review',
          isLoading: _isSubmitting,
          onPressed: _handleSubmit,
        ),
      ],
    );
  }

  Widget _buildField(String label, TextEditingController controller, String placeholder, {int maxLines = 1}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: widget.isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
          ),
        ),
        const SizedBox(height: 4),
        TextFormField(
          controller: controller,
          maxLines: maxLines,
          validator: (val) => val == null || val.isEmpty ? 'Required field' : null,
          style: TextStyle(
            fontSize: 13,
            color: widget.isDark ? Colors.white : AppColors.textLightPrimary,
          ),
          decoration: InputDecoration(
            hintText: placeholder,
            hintStyle: const TextStyle(fontSize: 12, color: Colors.grey),
            filled: true,
            fillColor: widget.isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFF1F5F9),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide.none,
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isSubmitting = true);

    final success = await Provider.of<ReviewProvider>(context, listen: false).submitReview(
      studentName: _nameController.text.trim(),
      collegeName: _collegeController.text.trim(),
      projectTitle: _projectController.text.trim(),
      rating: _rating.toInt(),
      reviewText: _reviewController.text.trim(),
    );

    setState(() => _isSubmitting = false);
    if (mounted) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(success ? 'Review submitted for approval! Thank you.' : 'Failed to submit review'),
          backgroundColor: success ? AppColors.brandEmerald : Colors.red,
        ),
      );
    }
  }
}
