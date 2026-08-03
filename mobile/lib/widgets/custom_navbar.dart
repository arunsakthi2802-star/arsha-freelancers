import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../core/constants/app_colors.dart';

class CustomBottomNavBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;
  final bool isDark;

  const CustomBottomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.dark200.withValues(alpha: 0.9) : Colors.white.withValues(alpha: 0.9),
        border: Border(
          top: BorderSide(
            color: isDark ? AppColors.darkGlassBorder : AppColors.lightGlassBorder,
          ),
        ),
      ),
      child: BottomNavigationBar(
        currentIndex: currentIndex,
        onTap: onTap,
        backgroundColor: Colors.transparent,
        elevation: 0,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: AppColors.brandBlue,
        unselectedItemColor: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
        selectedFontSize: 11,
        unselectedFontSize: 11,
        items: const [
          BottomNavigationBarItem(icon: Icon(LucideIcons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.folder), label: 'Projects'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.code), label: 'Services'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.image), label: 'Gallery'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.star), label: 'Reviews'),
          BottomNavigationBarItem(icon: Icon(LucideIcons.messageSquare), label: 'Contact'),
        ],
      ),
    );
  }
}
