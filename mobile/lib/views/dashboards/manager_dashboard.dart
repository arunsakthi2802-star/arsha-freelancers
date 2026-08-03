import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/theme_provider.dart';
import '../../widgets/glass_card.dart';

class ManagerDashboard extends StatelessWidget {
  const ManagerDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);
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
                const Icon(LucideIcons.briefcase, color: AppColors.brandPurple, size: 28),
                const SizedBox(width: 14),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Manager Control Center',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: isDark ? Colors.white : AppColors.textLightPrimary,
                      ),
                    ),
                    Text(
                      'Welcome, ${authProvider.user?.fullName ?? 'Manager'}',
                      style: const TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          const Text('Active Team Tasks', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          GlassCard(
            isDarkMode: isDark,
            child: const ListTile(
              leading: Icon(LucideIcons.checkSquare, color: AppColors.brandEmerald),
              title: Text('Review IEEE 2026 Base Paper Implementations'),
              subtitle: Text('3 pending submissions from developer team'),
            ),
          ),
        ],
      ),
    );
  }
}
