import 'package:flutter/material.dart';
import '../core/constants/app_colors.dart';

class AnimatedMeshBackground extends StatelessWidget {
  final bool isDarkMode;
  final Widget child;

  const AnimatedMeshBackground({
    super.key,
    required this.isDarkMode,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: isDarkMode ? AppColors.dark100 : AppColors.light200,
        gradient: isDarkMode
            ? const LinearGradient(
                colors: [
                  Color(0xFF02040A),
                  Color(0xFF050816),
                  Color(0xFF0B1120),
                  Color(0xFF13092A),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : const LinearGradient(
                colors: [
                  Color(0xFFF8FAFC),
                  Color(0xFFF1F5F9),
                  Color(0xFFE2E8F0),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
      ),
      child: Stack(
        children: [
          if (isDarkMode) ...[
            Positioned(
              top: -80,
              right: -80,
              child: Container(
                width: 250,
                height: 250,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.brandBlue.withValues(alpha: 0.18),
                ),
              ),
            ),
            Positioned(
              bottom: 120,
              left: -60,
              child: Container(
                width: 220,
                height: 220,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.brandPurple.withValues(alpha: 0.18),
                ),
              ),
            ),
          ],
          SafeArea(child: child),
        ],
      ),
    );
  }
}
