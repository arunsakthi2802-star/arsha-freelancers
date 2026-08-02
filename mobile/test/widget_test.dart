import 'package:flutter_test/flutter_test.dart';
import 'package:arsha_mobile/main.dart';

void main() {
  testWidgets('App loads smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const ArshaMobileApp());
    expect(find.text('ARSHA '), findsOneWidget);
  });
}
