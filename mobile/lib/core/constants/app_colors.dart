import 'package:flutter/material.dart';

class AppColors {
  // Brand Primary & Gradients
  static const Color brandBlue = Color(0xFF2563EB);
  static const Color brandIndigo = Color(0xFF4F46E5);
  static const Color brandPurple = Color(0xFF7C3AED);
  static const Color brandCyan = Color(0xFF06B6D4);
  static const Color brandEmerald = Color(0xFF10B981);
  static const Color brandOrange = Color(0xFFF97316);
  static const Color brandPink = Color(0xFFEC4899);
  static const Color brandYellow = Color(0xFFFACC15);

  // Dark Theme Backgrounds (matching ultimate-bg-animate & CSS dark-100 to 300)
  static const Color dark100 = Color(0xFF050816);
  static const Color dark200 = Color(0xFF0B1120);
  static const Color dark300 = Color(0xFF111827);
  static const Color darkSurface = Color(0xFF1E293B);

  // Light Theme Backgrounds
  static const Color light100 = Color(0xFFFFFFFF);
  static const Color light200 = Color(0xFFF8FAFC);
  static const Color light300 = Color(0xFFF3F4F6);

  // Glass Colors & Borders
  static Color darkGlassBg = const Color(0xFF0B1120).withValues(alpha: 0.75);
  static Color darkGlassBorder = Colors.white.withValues(alpha: 0.08);
  static Color lightGlassBg = Colors.white.withValues(alpha: 0.85);
  static Color lightGlassBorder = const Color(0xFFE2E8F0).withValues(alpha: 0.8);

  // Text Colors
  static const Color textDarkPrimary = Color(0xFFF8FAFC);
  static const Color textDarkSecondary = Color(0xFF94A3B8);
  static const Color textLightPrimary = Color(0xFF0F172A);
  static const Color textLightSecondary = Color(0xFF64748B);

  // Primary Gradient
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [brandBlue, brandPurple],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const LinearGradient secondaryGradient = LinearGradient(
    colors: [brandCyan, brandBlue],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const LinearGradient accentGradient = LinearGradient(
    colors: [brandOrange, brandPink],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );
}
