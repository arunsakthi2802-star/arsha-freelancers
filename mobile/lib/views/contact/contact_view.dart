import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/theme_provider.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/custom_button.dart';
import 'quote_modal_sheet.dart';

class ContactView extends StatelessWidget {
  const ContactView({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Contact ARSHA Freelancers',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w900,
              color: isDark ? Colors.white : AppColors.textLightPrimary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Get in touch for IEEE project consultation, viva prep, and custom solutions.',
            style: TextStyle(
              fontSize: 13,
              color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
            ),
          ),
          const SizedBox(height: 16),

          // Instant Quote Card Banner
          GlassCard(
            isDarkMode: isDark,
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(LucideIcons.messageSquare, color: AppColors.brandEmerald, size: 24),
                    SizedBox(width: 10),
                    Text(
                      'Need Instant Pricing?',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Submit your guidelines to calculate customized quote estimates.',
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                  ),
                ),
                const SizedBox(height: 14),
                CustomButton(
                  text: 'Open Instant Quote Form',
                  icon: LucideIcons.send,
                  onPressed: () => QuoteModalSheet.show(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Contact Details Cards
          _buildContactTile(
            isDark: isDark,
            icon: LucideIcons.phone,
            title: 'WhatsApp & Phone',
            subtitle: '+91 8300799120',
            color: AppColors.brandEmerald,
            onTap: () => launchUrl(Uri.parse('https://wa.me/918300799120')),
          ),

          const SizedBox(height: 10),

          _buildContactTile(
            isDark: isDark,
            icon: LucideIcons.mail,
            title: 'Official Email',
            subtitle: 'arshafreelancers@gmail.com',
            color: AppColors.brandBlue,
            onTap: () => launchUrl(Uri.parse('mailto:arshafreelancers@gmail.com')),
          ),

          const SizedBox(height: 10),

          _buildContactTile(
            isDark: isDark,
            icon: LucideIcons.mapPin,
            title: 'Head Office Location',
            subtitle: 'Salem & Chennai, Tamil Nadu, India',
            color: AppColors.brandPurple,
          ),
        ],
      ),
    );
  }

  Widget _buildContactTile({
    required bool isDark,
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    VoidCallback? onTap,
  }) {
    return GlassCard(
      isDarkMode: isDark,
      onTap: onTap,
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: isDark ? Colors.white : AppColors.textLightPrimary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                  ),
                ),
              ],
            ),
          ),
          if (onTap != null)
            const Icon(LucideIcons.chevronRight, size: 18, color: Colors.grey),
        ],
      ),
    );
  }
}
