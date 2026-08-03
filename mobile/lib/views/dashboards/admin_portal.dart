import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/theme_provider.dart';
import '../../widgets/glass_card.dart';

class AdminPortal extends StatelessWidget {
  const AdminPortal({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      physics: const BouncingScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GlassCard(
            isDarkMode: isDark,
            padding: const EdgeInsets.all(18),
            child: Row(
              children: [
                const Icon(LucideIcons.shieldCheck, color: AppColors.brandOrange, size: 28),
                const SizedBox(width: 14),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Admin Control Portal',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : AppColors.textLightPrimary,
                      ),
                    ),
                    const Text(
                      'Full CRUD Management (Users, Reviews, Gallery, Stories)',
                      style: TextStyle(fontSize: 11, color: Colors.grey),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            children: [
              _buildAdminCard(isDark, LucideIcons.users, 'Users', 'Manage Accounts', AppColors.brandBlue),
              _buildAdminCard(isDark, LucideIcons.star, 'Reviews', 'Approve Feedback', Colors.amber),
              _buildAdminCard(isDark, LucideIcons.image, 'Gallery', 'Upload Showcase', AppColors.brandCyan),
              _buildAdminCard(isDark, LucideIcons.fileText, 'Stories', 'Publish Articles', AppColors.brandPurple),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAdminCard(bool isDark, IconData icon, String title, String subtitle, Color color) {
    return GlassCard(
      isDarkMode: isDark,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 28, color: color),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          Text(subtitle, style: const TextStyle(fontSize: 10, color: Colors.grey)),
        ],
      ),
    );
  }
}
